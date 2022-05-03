import classes from './index.module.css'

type CodeTextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

function CodeTextArea(props: CodeTextAreaProps) {
  return <textarea className={classes.CodeTextArea} rows={1} {...props} />
}

export default CodeTextArea
