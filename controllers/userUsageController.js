//importing modules
const db = require("../models");

const UserUsage = db.userusage;

exports.clickTranslateButton = async (req, res) => {
  try {
    console.log("click translate button");
    const userId = req.params.userId;

    const userusage = await UserUsage.findOne({
      where: { userId: userId },
    });

    await userusage.update({
      translateButtonClick: userusage.translateButtonClick + 1,
    });

    res.status(200).json("Tracked translate button click");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
