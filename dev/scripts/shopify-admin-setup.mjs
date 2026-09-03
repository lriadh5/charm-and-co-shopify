#!/usr/bin/env node
// One-time setup script: creates the collections, navigation menu, and
// metafield definitions this theme expects, via the Shopify Admin GraphQL
// API. NOT executed yet — there is no store/token to run it against. Read
// docs/collections-and-navigation.md and docs/tagging-conventions.md first;
// this script is the "run this once you have API access" counterpart to
// those docs. Re-verify the mutations against the current Shopify Admin API
// docs before running — this targets API version 2026-07 (current stable
// as of Sept 2026); bump API_VERSION below if that's since moved on.
//
// Usage:
//   SHOPIFY_STORE_DOMAIN=your-store.myshopify.com \
//   SHOPIFY_ADMIN_API_TOKEN=shpat_xxx \
//   node dev/scripts/shopify-admin-setup.mjs
//
// Required Admin API scopes: read_products, write_products,
// read_online_store_navigation, write_online_store_navigation.

const API_VERSION = '2026-07';

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_ADMIN_API_TOKEN;

if (!domain || !token) {
  console.error(
    'Set SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_API_TOKEN before running this script.'
  );
  process.exit(1);
}

async function adminGraphQL(query, variables) {
  const res = await fetch(`https://${domain}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }
  return json.data;
}

// ---------------------------------------------------------------------
// 1. Metafield definitions (see docs/tagging-conventions.md for why only
//    material/dimensions are metafields — capsule/style use tags instead).
// ---------------------------------------------------------------------
const METAFIELD_DEFINITIONS = [
  {
    name: 'Material',
    namespace: 'custom',
    key: 'material',
    type: 'single_line_text_field',
    ownerType: 'PRODUCT',
  },
  {
    name: 'Dimensions',
    namespace: 'custom',
    key: 'dimensions',
    type: 'single_line_text_field',
    ownerType: 'PRODUCT',
  },
];

const METAFIELD_DEFINITION_CREATE = `
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition { id name namespace key }
      userErrors { field message code }
    }
  }
`;

async function createMetafieldDefinitions() {
  for (const definition of METAFIELD_DEFINITIONS) {
    const data = await adminGraphQL(METAFIELD_DEFINITION_CREATE, { definition });
    const result = data.metafieldDefinitionCreate;
    if (result.userErrors?.length) {
      console.warn(`  ! ${definition.namespace}.${definition.key}:`, result.userErrors);
    } else {
      console.log(`  + created metafield ${definition.namespace}.${definition.key}`);
    }
  }
}

// ---------------------------------------------------------------------
// 2. Collections (see docs/collections-and-navigation.md for the full
//    rationale per collection). "Shop All" is intentionally omitted —
//    Shopify provides /collections/all automatically, no need to create it.
// ---------------------------------------------------------------------
const COLLECTIONS = [
  { title: 'New Arrivals', handle: 'new-arrivals', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'new-arrival' }] },
  { title: 'Best Sellers', handle: 'best-sellers', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'bestseller' }] },
  { title: 'Phone Charms', handle: 'phone-charms', rules: [{ column: 'TYPE', relation: 'EQUALS', condition: 'Phone Charm' }] },
  { title: 'Bag & Backpack Charms', handle: 'bag-backpack-charms', rules: [{ column: 'TYPE', relation: 'EQUALS', condition: 'Bag Charm' }] },
  { title: 'Bracelets', handle: 'bracelets', rules: [{ column: 'TYPE', relation: 'EQUALS', condition: 'Bracelet' }] },
  { title: 'Bracelet Kits', handle: 'bracelet-kits', rules: [{ column: 'TYPE', relation: 'EQUALS', condition: 'Bracelet Kit' }] },
  { title: 'Hair Accessories', handle: 'hair-accessories', rules: [{ column: 'TYPE', relation: 'EQUALS', condition: 'Hair Accessory' }] },
  { title: 'Matching Sets', handle: 'matching-sets', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'Matching Set' }] },
  { title: 'Gifts Under $15', handle: 'gifts-under-15', rules: [{ column: 'VARIANT_PRICE', relation: 'LESS_THAN', condition: '15.00' }] },
  { title: 'Gifts Under $20', handle: 'gifts-under-20', rules: [{ column: 'VARIANT_PRICE', relation: 'LESS_THAN', condition: '20.00' }] },
  { title: 'Sale', handle: 'sale', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'sale' }] },
  { title: 'Bundles', handle: 'bundles', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'Bundle' }] },
  { title: 'Pink Pop', handle: 'pink-pop', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'capsule_pink-pop' }] },
  { title: 'Midnight', handle: 'midnight', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'capsule_midnight' }] },
  { title: 'Ocean', handle: 'ocean', rules: [{ column: 'TAG', relation: 'EQUALS', condition: 'capsule_ocean' }] },
];

const COLLECTION_CREATE = `
  mutation CreateCollection($input: CollectionInput!) {
    collectionCreate(input: $input) {
      collection { id title handle }
      userErrors { field message }
    }
  }
`;

async function createCollections() {
  for (const { title, handle, rules } of COLLECTIONS) {
    const data = await adminGraphQL(COLLECTION_CREATE, {
      input: { title, handle, ruleSet: { appliedDisjunctively: false, rules } },
    });
    const result = data.collectionCreate;
    if (result.userErrors?.length) {
      console.warn(`  ! ${handle}:`, result.userErrors);
    } else {
      console.log(`  + created collection ${handle}`);
    }
  }
}

// ---------------------------------------------------------------------
// 3. Main navigation menu (see docs/collections-and-navigation.md).
//    Updates the existing "main-menu" if present; creates one otherwise.
// ---------------------------------------------------------------------
const NAV_ITEMS = [
  { title: 'New', type: 'COLLECTION', handle: 'new-arrivals' },
  { title: 'Phone Charms', type: 'COLLECTION', handle: 'phone-charms' },
  { title: 'Bag Charms', type: 'COLLECTION', handle: 'bag-backpack-charms' },
  { title: 'Bracelets', type: 'COLLECTION', handle: 'bracelets' },
  { title: 'Hair', type: 'COLLECTION', handle: 'hair-accessories' },
  { title: 'Sets', type: 'COLLECTION', handle: 'matching-sets' },
  { title: 'Under $15', type: 'COLLECTION', handle: 'gifts-under-15' },
  { title: 'Sale', type: 'COLLECTION', handle: 'sale' },
];

const GET_MENU_BY_HANDLE = `
  query GetMenu($handle: String!) {
    menu(handle: $handle) { id }
  }
`;

const MENU_CREATE = `
  mutation CreateMenu($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) {
    menuCreate(title: $title, handle: $handle, items: $items) {
      menu { id handle }
      userErrors { field message }
    }
  }
`;

const MENU_UPDATE = `
  mutation UpdateMenu($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) {
    menuUpdate(id: $id, title: $title, items: $items) {
      menu { id handle }
      userErrors { field message }
    }
  }
`;

function navItemInput(item) {
  return {
    title: item.title,
    type: item.type,
    resource: { collectionHandle: item.handle },
  };
}

async function createOrUpdateNavigation() {
  const existing = await adminGraphQL(GET_MENU_BY_HANDLE, { handle: 'main-menu' });
  const items = NAV_ITEMS.map(navItemInput);

  if (existing.menu) {
    const data = await adminGraphQL(MENU_UPDATE, {
      id: existing.menu.id,
      title: 'Main menu',
      items,
    });
    logMenuResult(data.menuUpdate, 'updated');
  } else {
    const data = await adminGraphQL(MENU_CREATE, {
      title: 'Main menu',
      handle: 'main-menu',
      items,
    });
    logMenuResult(data.menuCreate, 'created');
  }
}

function logMenuResult(result, verb) {
  if (result.userErrors?.length) {
    console.warn(`  ! main-menu:`, result.userErrors);
  } else {
    console.log(`  + ${verb} main-menu`);
  }
}

// ---------------------------------------------------------------------
async function main() {
  console.log('Creating metafield definitions...');
  await createMetafieldDefinitions();

  console.log('Creating collections...');
  await createCollections();

  console.log('Setting up navigation...');
  await createOrUpdateNavigation();

  console.log('Done. Verify everything in the Shopify admin before going live.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
