const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  quizName:{
    type:String
  },
    quizType:{
      type:String
    },
    genre:{
      type:String
    },
    quizDate:{
      type:String
    },
    quizDuration:{
      type:Number
    },
    numQuestions:{
      type:Number
    },
    scoreCorrect:{
      type:Number
    },
    scoreIncorrect:{
      type:Number
    },
    questions:{
      type:Array
    },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
},{timestamps:true});

const resultSchema = new mongoose.Schema({ // Optional collection for results
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: Number,
  answers: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      userAnswer: { type: String, or: [{ type: String }] },
      isCorrect: Boolean,
    },
  ],
  completedAt: { type: Date, default: Date.now },
});

module.exports = {
  Quiz: mongoose.model('Quiz', quizSchema),
  Result: mongoose.model('Result', resultSchema), // Optional
};
