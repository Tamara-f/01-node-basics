const Avatar = require('avatar-builder');
const path = require('path');
const fs = require('fs-extra');

const IMG_DIR = path.join(process.cwd(), 'public', 'images', '/');
//schema
const avatar = Avatar.builder(
  Avatar.Image.margin(
    Avatar.Image.roundedRectMask(
      Avatar.Image.compose(
        Avatar.Image.randomFillStyle(),
        Avatar.Image.shadow(Avatar.Image.margin(Avatar.Image.cat(), 8), {
          blur: 5,
          offsetX: 2.5,
          offsetY: -2.5,
          color: 'rgba(0,0,0,0.75)',
        })
      ),
      32
    ),
    8
  ),
  128,
  128
);

const randomAvatar = async user => {
  //create & save in tmp
  avatar.create(user._id).then(tmp => {
    const avatarFileName = `${user._id}.png`;
    fs.writeFileSync(`tmp/${avatarFileName}`, tmp);

    //replace start
    fs.move(
      `tmp/${user._id}.png`,
      path.join(IMG_DIR, avatarFileName),

      function (err) {
        if (err) return console.error(err);
        console.log('Successfully moved');
      }
    );
  });
};

module.exports = randomAvatar;
