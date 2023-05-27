import {Provider} from 'react-redux';
import DashBoard from "./DashBoard";
import Home from "./Home";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import store from '../redux/store';

const App= () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>}></Route>
                    <Route path='/DashBoard' element={<DashBoard/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;