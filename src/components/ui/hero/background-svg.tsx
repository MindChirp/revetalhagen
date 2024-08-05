export default function BackgroundSvg({
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1144 972"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M932.645 191.688C1054.48 182.733 1124.45 117.849 1142.56 -2.96177L1.23913 -2.96179L1.23911 970.285L92.9783 970.285C214.811 961.33 284.783 896.446 302.895 775.635C321.007 654.824 390.979 589.941 512.812 580.986C634.644 572.031 704.616 507.148 722.728 386.337C740.84 265.526 810.812 200.643 932.645 191.688Z"
        fill="#FDFDFD"
        stroke="#FDFDFD"
        stroke-width="2"
      />
    </svg>
  );
}
