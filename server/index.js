const http = require('http');
const url = require('url');

const MOCK_RECIPES = [
  {
    id: 1,
    name: 'Spaghetti Carbonara',
    description: 'A classic Italian pasta dish.',
    imgUrl: 'https://placehold.co/300x200.png?text=Spaghetti+Carbonara',
    isFavorite: true,
    ingredients: [
      { name: 'Spaghetti', quantity: 200, unit: 'g' },
      { name: 'Guanciale', quantity: 100, unit: 'g' },
      { name: 'Egg Yolks', quantity: 4, unit: 'each' },
      { name: 'Pecorino Romano Cheese', quantity: 50, unit: 'g' },
      { name: 'Black Pepper', quantity: 1, unit: 'tsp' },
    ],
  },
  {
    id: 2,
    name: 'Caprese Salad',
    description: 'A simple and refreshing Italian salad.',
    imgUrl: 'https://placehold.co/300x200.png?text=Caprese+Salad',
    isFavorite: false,
    ingredients: [
      { name: 'Tomatoes', quantity: 4, unit: 'each' },
      { name: 'Fresh Mozzarella', quantity: 200, unit: 'g' },
      { name: 'Fresh Basil', quantity: 1, unit: 'bunch' },
      { name: 'Extra Virgin Olive Oil', quantity: 2, unit: 'tbsp' },
    ],
  },
];

const PORT = 4000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORSヘッダーを設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONSリクエストへの対応
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request (preflight)');
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /api/recipes
  if (req.method === 'GET' && pathname === '/api/recipes') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(MOCK_RECIPES));
    return;
  }

  // GET /api/recipes/:id
  const recipeIdMatch = pathname.match(/^\/api\/recipes\/(\d+)$/);
  if (req.method === 'GET' && recipeIdMatch) {
    const recipeId = parseInt(recipeIdMatch[1], 10);
    const recipe = MOCK_RECIPES.find(r => r.id === recipeId);
    
    if (recipe) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(recipe));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Recipe not found' }));
    }
    return;
  }

  // POST /api/recipes
  if (req.method === 'POST' && pathname === '/api/recipes') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { name, description } = JSON.parse(body);
        
        // 新しいレシピを作成
        const newId = MOCK_RECIPES.length + 1;
        const imgUrl = `https://placehold.co/300x200.png?text=${name.replace(/ /g, '+')}`;
        
        const newRecipe = {
          id: newId,
          name: name,
          description: description,
          imgUrl: imgUrl,
          isFavorite: false,
          ingredients: [],
        };
        
        // MOCK_RECIPESに追加
        MOCK_RECIPES.push(newRecipe);
        
        // レスポンスを返す
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id: newId }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // その他のリクエストは404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/recipes`);
});