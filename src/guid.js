let guid = 1;
const newGuid = function newGuid() {
  return guid++;
};

export default newGuid;
