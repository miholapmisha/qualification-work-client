import { PropsWithChildren, InputHTMLAttributes, RefObject } from "react";

type EditDescriptionAreaProps = PropsWithChildren<InputHTMLAttributes<HTMLTextAreaElement> & { ref?: RefObject<HTMLTextAreaElement | null> }>;

const EditDescriptionArea = ({ ref, ...props }: EditDescriptionAreaProps) => {
    return <textarea
        autoFocus
        ref={ref}
        {...props}
        className="w-full border border-primary-300 rounded-xl p-4 resize-none outline-none font-main text-primary-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all min-h-24"
    />
}

export default EditDescriptionArea