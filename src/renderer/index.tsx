import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import VisualizationPage from './pages/VisualizationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/visualization" component={VisualizationPage} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
