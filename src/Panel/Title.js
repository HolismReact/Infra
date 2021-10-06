import React, { useState, useEffect } from 'react';
import app from '../Base/App';

const Title = ({ }) => {

    const [pageTitle, setPageTitle] = useState('');
    const [pageSubtitle, setPageSubtitle] = useState('');
    const [breadcrumbItems, setBreadcrumbItems] = useState([]);
    const [hasSubtitleOrBreadcrumb, setHasSubtitleOrBreadcrum] = useState();
    const [isShown, setIsShown] = useState(true);

    useEffect(() => {
        const hide = () => {
            setIsShown(false);
        };
        app.on(app.makeRoom, hide);
        return () => {
            app.removeListener(app.makeRoom, hide);
        };
    });

    useEffect(() => {
        const show = () => {
            setIsShown(true);
        };
        app.on(app.returnBackToNormalForm, show);
        return () => {
            app.removeListener(app.returnBackToNormalForm, show);
        };
    });

    useEffect(() => {
        const setTitleAndSubtitle = ({ pageTitle, pageSubtitle, breadcrumbItems }) => {
            setPageTitle(pageTitle);
            setPageSubtitle(pageSubtitle);
            if (breadcrumbItems && breadcrumbItems.length) {
                setBreadcrumbItems(breadcrumbItems);
            }
        };
        app.on(app.componentLoaded, setTitleAndSubtitle);
        return () => {
            app.removeListener(app.componentLoaded, setTitleAndSubtitle);
        }
    });

    useEffect(() => {
        if (app.isSomething(pageSubtitle) || (breadcrumbItems.length > 0)) {
            setHasSubtitleOrBreadcrum(true);
        }
        else {
            setHasSubtitleOrBreadcrum(false);
        }
    }, [pageSubtitle, breadcrumbItems]);

    return <>
        {
            (app.isNothing(pageTitle + pageSubtitle) && breadcrumbItems.length === 0)
                ?
                <div></div>
                :
                <div className={"mb-10 pl-10 md:pl-0 " + (hasSubtitleOrBreadcrumb ? "h-12" : "h-6") + (isShown ? "" : " hidden")}>
                    <div className="font-medium mb-2 tracking-wider	text-xl text-gray-900">{pageTitle}</div>
                    {
                        hasSubtitleOrBreadcrumb
                            ?
                            <div className="text-xs tracking-wider text-gray-700 flex items-center">
                                {
                                    pageSubtitle ||
                                    (
                                        breadcrumbItems.map((item, index) => <span key={item.title}>
                                            <span>{item.title}</span>
                                            {index === breadcrumbItems.length - 1
                                                ?
                                                null
                                                :
                                                <span className="mx-2" style={{ 'font-size': '10px' }}>/</span>
                                            }
                                        </span>)
                                    )
                                }
                            </div>
                            :
                            null
                    }
                </div>
        }
    </>
}

export default Title;