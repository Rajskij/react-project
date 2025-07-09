import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SearchBar({ onChange }) {
    return (
        <div className="grid w-full items-center">
            <Label className="mb-3" htmlFor="search">Search By Keyword</Label>
            <Input
                type="text"
                id="search"
                placeholder="Type a movie name..."
                onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === '' ? null : val);
                }}
            />
        </div>
    );
}