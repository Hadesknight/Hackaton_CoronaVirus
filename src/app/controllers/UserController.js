import * as Yup from 'yup';
import User from '../models/User';

export default {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      city: Yup.string().required(),
      uf: Yup.string().required().max(2),
      birth_date: Yup.date().required(),
      password: Yup.string().required().min(6),
    });

    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const userExist = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res.status(401).json({ error: 'Email already exist in DB' });
      }

      const { id, name, email, city, uf } = await User.create(req.body);

      return res.json({
        id,
        name,
        email,
        city,
        uf,
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create User ' });
    }
  },
};
