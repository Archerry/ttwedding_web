import { PagePanel } from './styled';

export default function ({
  children,
  style,
}: {
  children: any;
  style?: object;
}) {
  return <PagePanel style={style}>{children}</PagePanel>;
}
