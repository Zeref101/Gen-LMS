import { Input } from "@/components/ui/input";

const GlobalSearch = () => {
    return (
        <div className="relative w-full max-w-[600px] max-lg:hidden">
            <div className="bg-[#F4F6F8] relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
                <img
                    src="/public/icons/search.svg"
                    alt="search"
                    height={24}
                    width={24}
                    className="cursor-pointer"
                />
                <Input
                    type="text"
                    placeholder="Search globally"
                    className="text-[16px] font-normal leading-[22.4px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important placeholder bg-[#F4F6F8] border-none shadow-none outline-none "
                />
            </div>
        </div>
    );
};

export default GlobalSearch;
