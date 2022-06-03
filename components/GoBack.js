import { useRouter } from 'next/router';
import React from 'react';
import { ArrowBack } from 'tabler-icons-react';

function GoBack() {
  const router = useRouter();
  return (
    <p
      className="flex items-center gap-x-2 mb-4 text-white cursor-pointer"
      onClick={() => router.back()}
    >
      <ArrowBack size={15} /> Go back
    </p>
  );
}

export default GoBack;
