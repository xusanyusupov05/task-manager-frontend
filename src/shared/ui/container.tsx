export function Container({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`${className} w-full !max-w-[1350px] !mx-auto !my-5 !px-5`}>
            {children}
        </div>
    )
}