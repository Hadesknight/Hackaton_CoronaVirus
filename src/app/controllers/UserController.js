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

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      city: Yup.string(),
      uf: Yup.string().max(2),
      birth_date: Yup.date(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    try {
      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation Fails' });
      }

      const { oldPassword, email } = req.body;
      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const emailExist = await User.findOne({ where: { email } });

        if (emailExist) {
          return res.status(401).json({ error: 'email already exist' });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: 'Invalid Password' });
      }

      const userUpdate = await user.update(req.body);

      return res.json(userUpdate);
    } catch (err) {
      return res.status(500).json({ error: 'Error to update user' });
    }
  },
};
