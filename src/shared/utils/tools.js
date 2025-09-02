export const createUUID = (type = "gen") => {
  return `${type}-${Math.floor(Math.random() * 100)}-${Date.now()}`;
};
