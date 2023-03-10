import React, {useCallback} from 'react';
import {Route, Routes} from 'react-router-dom';
import OverviewPage from "./pages/OverviewPage";
import NewsPage from "./pages/NewsPage";
import useFetchNews from "./hooks/useFetchNews";

function App() {
    const {news, fetch, loading} = useFetchNews();
    const fetchHandler = useCallback(() => fetch(), [fetch]);
    return (
        <>
            <Routes>
                <Route path="/" element={<NewsPage news={news} loading={loading} fetchHandler={fetchHandler}/>}/>
                <Route path="/:id" element={<OverviewPage/>}/>
            </Routes>
        </>
    );
}

export default App;
