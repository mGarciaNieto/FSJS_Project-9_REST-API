'use strict'

const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'A first name is required'
					},
					notEmpty: {
						msg: 'Please provide a first name'
					}
				}
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'A last name is required'
					},
					notEmpty: {
						msg: 'Please provide a last name'
					}
				}
			},
			emailAddress: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: {
					msg: 'The email address you entered already exists'
				},
				validate: {
					notNull: {
						msg: 'An email address is required'
					},
					isEmail: {
						msg: 'Please provide a valid email address'
					}
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				set(val) {
					const hashedPassword = bcrypt.hashSync(val, 10)
					this.setDataValue('password', hashedPassword)
				},
				validate: {
					notNull: {
						msg: 'A password is required'
					},
					notEmpty: {
						msg: 'Please provide a password'
					}
				}
			}
		},
		{ sequelize }
	)

	User.associate = (models) => {
		User.hasMany(models.Course, {
			as: 'user',
			foreignKey: {
				fieldName: 'userId',
				allowNull: false
			}
		})
	}

	return User
}