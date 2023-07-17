const { Schema, model } = require("mongoose");

const recipeSchema = new Schema({
   title: {
      type: String,
      required: [true, "Set recipe title"],
   },
   category: {
      type: String,
      required: [true, "Set recipe category"],
   },
   area: {
      type: String,
      default: "",
   },
   // instructions: {
   //   type: Array,
   //   required: [true, "Set the instructions"],
   // },
   instructions: {
      type: Array,
      items: {
         type: String,
      },
      required: [true, "Set the instructions"],
   },
   description: {
      type: String,
      required: [true, "Set the description"],
   },
   thumb: {
      type: String,
      default: "",
   },
   imgPublicId: {
      type: String,
   },
   preview: {
      type: String,
      default: "",
   },
   time: {
      type: String,
   },
   youtube: {
      type: String,
      default: "",
   },
   tags: {
      type: Array,
      default: [],
   },
   isLikedBy: [
      {
         type: Schema.Types.ObjectId,
         ref: "user",
      },
   ],
   favorites: {
      type: [Schema.Types.ObjectId],
      ref: "user",
      default: [],
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
   },
   ingredients: [
      {
         id: String,
         measure: String,
      },
   ],
});

module.exports = model("recipes", recipeSchema);
// ingredients: [
//     {
//       id: {
//         type: Schema.Types.ObjectId,
//         ref: "ingredients",
//       },
//       measure: {
//         type: String,
//         required: [true, "Set the measure"],
//       },
//     },
//   ],

// ingredients: [
//   {
//     id: {
//       type: String,
//     },
//     measure: {
//       type: String,
//       required: [true, "Set the measure"],
//     },
//   },
// ],

/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - area
 *         - instructions
 *       properties:
 *         id:
 *           type: string
 *           example: 6462a8f74c3d0ddd28897fb8
 *         title:
 *           type: string
 *           example: Mediterranean Pasta Salad
 *         category:
 *           type: string
 *           example: Seafood
 *         area:
 *           type: string
 *           example: Italian
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *         description:
 *             type: string
 *         thumb:
 *            type: string
 *            example: https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg
 *         preview:
 *            type: string
 *            example: https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560402/mwtf7uqrnsxvlpjqtslc.jpg
 *         time:
 *             type: string
 *             example: 12
 *         youtube:
 *             type: string
 *             example: https://www.youtube.com/watch?v=e52IL8zYmaE
 *         tags:
 *             type: array
 *             items:
 *               type: string
 *             example: ["Pasta", "Baking"]
 *         isLikedBy:
 *             type: array
 *             items:
 *               $ref: "#/components/schemas/userRegisterResponse"
 *             example: [{"user1"}, {"user2"}]
 *         ingredients:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Ingredient'
 *
 *     Ingredient:
 *       required:
 *         - name
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Chicken
 *         desc:
 *           type: string
 *         img:
 *           type: string
 *           example: https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678564123/rw8pn3541bmukb8d3mio.png
 *
 *     Category:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Recipe"
 *
 */
