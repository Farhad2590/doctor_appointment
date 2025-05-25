import React from 'react';
import Banner from './components/Banner';
import DoctorList from './components/DoctorList';

const Home = () => {
    return (
        <div className='pt-15'>
            <Banner/>
            <DoctorList/>
        </div>
    );
};

export default Home;