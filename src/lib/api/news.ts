export const fetchNews = ({
  query = "",
  page = 0,
}: {
  query?: string;
  page?: number;
}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 100);
  });
};
