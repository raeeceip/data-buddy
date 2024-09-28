# Update Layout component
cat > src/components/Layout.tsx << EOL
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/visualization">Visualization</Link></li>
        </ul>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
EOL

# Update index.tsx with new React Router syntax
cat > src/index.tsx << EOL
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import VisualizationPage from './pages/VisualizationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOL

# Update main.js to use import instead of require for electron-is-dev
cat > main.js << EOL
const { app, BrowserWindow } = require('electron');
const path = require('path');

async function createWindow() {
  const isDev = (await import('electron-is-dev')).default;
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : \`file://\${path.join(__dirname, './build/index.html')}\`
  );

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
EOL

# Install missing dependency
npm install --save-dev @babel/plugin-proposal-private-property-in-object

echo "Project files have been updated. Please run 'npm start' again."