export default function TableCell({
    children,
    align = 'left',
    colSpan,
  }: {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    colSpan?: number;
  }) {
    const alignment = {
      left: 'text-left',
      right: 'text-right',
      center: 'text-center',
    }[align];
  
    return (
      <td className={`p-3 ${alignment}`} colSpan={colSpan}>
        {children}
      </td>
    );
  }
  