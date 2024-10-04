type LanguageProps = {
  code: string;
  name: string;
  flag: string;
};

export const DEFAULT_LANGUAGE_CODE = 'en';

export const availableLanguages: LanguageProps[] = [
  {
    code: 'en',
    name: 'English',
    flag: 'data:image/webp;base64,UklGRiwCAABXRUJQVlA4TB8CAAAvIkAEABfkNgDbtiHU7Gz9//dyQJcJIOUJt5EkSUrNvofK6viB/w6dzNPluJEkRWo4JofOf2vuv3RdlfNPMElTbcdYGoTBBoswWFgosAEbpQpIIKHC9fNDTZgBtXSkIxVhW/6mw4BKOm5ZvLLbPsIx8ivZhwKLycGGEM/apcMGIdO/dw7PbN45PLMhlg4q0z8TpFERZjDzRyyEgQE1IhIGwqQJkxCWChVh0gwMqB3eX6iECqi0P099NrRUeym91J7aaGhp7JP1cbZcZ/9vs11eHy1td05g6p71E4IkZHgxvMBTcv5hJyygQw2jnWhZuU/W+6WYUKmvE3dUShutjVJ6aaOgpTZaXw0Qtm071mq9+5rt3Oxle973pbfmbDfb+OlZEf1X5LZtI50yuvsKNQ94DZAq4zy3282Lkyr9+XVGK5A4FBxQRV9D+LJrtE4IBK8lTuUM2MXLupynVo6MIhY+w4SEniRO+TTYxYuanKUW903iYfxEPKSkJ3wrc8km0ZM5reIkMb+3PTeE36iXVOmNPMgc0gn0flTwPGvbWRjAf+y4ohf1rAD11NfTUsJSdy/uDrElQUtaqib6w6DYtrv0XsFLP0a37MrHyokqn+wbIyLrwWq6xpMl+zAmcSrvq54s9AWWyHy4XKjz8JlujEuc8ruIhwTfAIGB3sg18H0yXZiSuWQ3YUCoo9eyDX7CIgWOwiHha5jNqya+cpECVwUA',
  },
  {
    code: 'de',
    name: 'German',
    flag: 'data:image/webp;base64,UklGRjYAAABXRUJQVlA4TCkAAAAvIgAFABcwzgKBJJb9lXaJ+Q/agEzAQgkl9FFST9cKRPR/AkTvNWU3FAA=',
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: 'data:image/webp;base64,UklGRl4BAABXRUJQVlA4TFEBAAAvIoAFAFfiqrZtpcLdtTtBSEAC/t3d/cmp4TYA2LRRmJOd8e48x0zlVpVcSZKkVIO7u8MX5+Zq7s9dhvkPjyECJAAKwgABCsALMPgD4f4R0M/uT7SXJUA87v3HeiQgHiqx+qfog0BcwB8Zz2b4I+kXxxb66D5HD+w+SCJ/DEK7+P3uLukL+94B/eG0OhkJ6tfHIvE6jZFJuKBgVdLvpVvh4ZZrtoxYmaf87lABJKtCqAUREQLpAdN+CA9cxPiI6NkoDyP6zTEdV+AP/IvnJiWcOfvHA5ji1L9yQN0V4cqC+RGx/xenqmzWFVwJAGg02Xaz7a25Zt7/Uo/fEf2fgIK2cxgZuDlTAKb3l70ZD0RWpu1Oq8tKINT5ZFu/P7QFCCfer8rvj3cDMUh369/rO66KAIZJM/ufjm6JAWhdG9l5c7AvIPzIqD0royAEATaHsaBtAA==',
  },
];
