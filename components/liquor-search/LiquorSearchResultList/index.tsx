import LiquorCard from 'components/LiquorCard';

async function getLiquor(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(`/${id}`);
  return response.json();
}

const LiquorSearchResultList = async () => {
  return <></>;
};

export default LiquorSearchResultList;
