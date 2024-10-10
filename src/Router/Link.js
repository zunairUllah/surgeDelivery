import router from './Router';

export const Link = (href, text) => {
  const link = document.createElement('a');
  link.href = href;
  link.innerText = text;
  link.onclick = (event) => {
    event.preventDefault();
    history.pushState({}, '', href);
    router(); // Call the router function to render the new route
  };
  return link;
}
