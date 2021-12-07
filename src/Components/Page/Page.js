import React, { useState, useEffect } from 'react';
import app from '../../Base/App';

const Page = ({
    title,
    subtitle,
    breadcrumbItems,
    children
}) => {

    useEffect(() => {
        app.emit(app.componentLoaded, {
            pageTitle: title,
            pageSubtitle: subtitle,
            breadcrumbItems: breadcrumbItems
        });
    }, []);

    return <div
        className='bg-white py-6 md:rounded-lg'
    >
        {children}
    </div>
}

export default Page;
export { Page };