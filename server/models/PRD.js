const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PRD = sequelize.define('PRD', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {}
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'in_review', 'approved', 'published'),
      defaultValue: 'draft'
    }
  });

  PRD.associate = (models) => {
    PRD.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      }
    });
    PRD.belongsTo(models.Template, {
      foreignKey: {
        name: 'templateId',
        allowNull: false
      }
    });
    PRD.hasMany(models.Comment, {
      foreignKey: 'prdId',
      as: 'comments'
    });
  };

  return PRD;
};
