import { FilmIcon } from "lucide-react";

function PageHeader({ title, message, children }) {
    return (
        <div className="flex flex-col items-center mb-10">
            <div className="flex items-center">
                {children}
                {title && <h1 className="text-2xl">{title}</h1>}
            </div>
            {message && <p className="mt-3 text-m">{message}</p>}
        </div>
    );
}

export default PageHeader;