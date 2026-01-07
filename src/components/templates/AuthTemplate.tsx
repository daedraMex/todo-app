interface AuthTemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthTemplate = ({ header, content, footer }: AuthTemplateProps) => (
  <div className="min-h-screen bg-background flex items-center justify-center p-4">
    <div className="w-full max-w-md animate-scale-in">
      {header}
      {content}
      {footer && <div className="mt-6">{footer}</div>}
    </div>
  </div>
);