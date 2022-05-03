import './TextArea.css'

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

function TextArea(props: TextAreaProps) {
  return <textarea className="TextArea" rows={1} {...props} />
}

export default TextArea
