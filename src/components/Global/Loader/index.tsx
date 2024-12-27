type Props = {
    color?: string;
  };
  
  export const Loader = ({ color }: Props) => {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill={color || "#fff"}
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 0.446843C51.7666 -0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0872 9.04875 41.5917 10.4717 44.0445 10.1076C48.5519 9.54855 53.4355 9.67226 57.9199 10.4717C62.4044 11.2711 66.5892 12.5457 70.6331 15.2553C75.2735 17.9648 79.3347 21.5619 82.5849 25.8418C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.0409 91.5421 39.0409 93.9676 39.0409Z"
            fill={color || "#fff"}
          />
        </svg>
      </div>
    );
  };
  