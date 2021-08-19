import React, { useState, useEffect } from 'react';
import Holism from '../Base/Holism';

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
        Holism.on(Holism.makeRoom, hide);
        return () => {
            Holism.removeListener(Holism.makeRoom, hide);
        };
    });

    useEffect(() => {
        const show = () => {
            setIsShown(true);
        };
        Holism.on(Holism.returnBackToNormalForm, show);
        return () => {
            Holism.removeListener(Holism.returnBackToNormalForm, show);
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
        Holism.on(Holism.componentLoaded, setTitleAndSubtitle);
        return () => {
            Holism.removeListener(Holism.componentLoaded, setTitleAndSubtitle);
        }
    });

    useEffect(() => {
        if (Holism.isSomething(pageSubtitle) || (breadcrumbItems.length > 0)) {
            setHasSubtitleOrBreadcrum(true);
        }
        else {
            setHasSubtitleOrBreadcrum(false);
        }
    }, [pageSubtitle, breadcrumbItems]);

    return <div className={"mb-10 " + (hasSubtitleOrBreadcrumb ? "h-12" : "h-6") + (isShown ? "" : " hidden")}>
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

export default Title;