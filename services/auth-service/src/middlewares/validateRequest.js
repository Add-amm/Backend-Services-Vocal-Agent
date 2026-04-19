export const validateLogin = (req, res, next) => {
  const { username, mdp } = req.body;
  if (!username || !mdp) {
    return res.status(400).json({ message: "Nom d'utilisateur ou mot de passe manquant" });
  }
  next();
};

export const validateRegister = (req, res, next) => {
  const {
    nom_complet,
    email,
    phone_num,
    mdp,
    confirm_password
  } = req.body;

  if(!nom_complet || !email || !phone_num || !mdp || !confirm_password){
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }
  next();
};

export const validateUpdate = (req, res, next) => {
  const {
      nom_complet,
      email,
      phone_num,
  } = req.body;

  if(!nom_complet || !email || !phone_num){
      return res.status(400).json({ message: 'Tous les champs sont requis.' });
  }
  next();
};