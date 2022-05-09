import { useRouter } from 'next/router';
import FormList from '../../../components/Form/FormList';
import Heading from '../../../components/Heading';
import AdminLayout from '../../../components/Layouts/admin/AdminLayout';
import { projectForm } from '../../../config/forms/project';
import routes from '../../../config/routes';
import {
  getAbiList,
  getNetworksList,
  getProjectsList,
  getTokensList,
} from '../../../utils/getters';

const Project = ({ formData, name }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <AdminLayout>
      <Heading className="text-black">Editing Project: {name}</Heading>
      <FormList
        method="PATCH"
        action={`${routes.titan_chest_axios}/project/update/${id}`}
        formData={formData}
      />
    </AdminLayout>
  );
};

export const getServerSideProps = async ({ query }) => {
  const project = await getProjectsList(query.id);
  const abi = await getAbiList();
  const networks = await getNetworksList();
  const tokens = await getTokensList();

  const formData = projectForm.map((form) => {
    form.value = project[form.name];

    if (form.name === 'abi_id') {
      form.data = abi;
      return form;
    }

    if (form.name === 'network_id') {
      form.data = networks;
      return form;
    }

    if (form.name === 'token_id') {
      form.data = tokens;
      return form;
    }

    if (form.name === 'token_pair_id') {
      form.data = tokens;
      return form;
    }

    return form;
  });

  return {
    props: {
      formData,
      name: project.name,
    },
  };
};

export default Project;
