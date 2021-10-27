const Dashboard = ({
    title,
    subtitle,
    breadcrumbItems,
    children
}) => {
    return <div
        className="py-6"
    >
        {children}
    </div>
}

export default Dashboard;
export { Dashboard };
export { Section } from './Section';
export { Widget } from './Widget';