import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

function App() {
	return (
		<div className='min-h-screen bg-gray-50'>
			<ScrollToTop />
			<Header />
			<Outlet />
		</div>
	);
}

export default App;