// https://zenn.dev/toono_f/articles/bd50ddd0a7bc76
declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}