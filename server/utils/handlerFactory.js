import AppError from "../utils/appErrors.js";
import catchAsync from "../utils/catchAsync.js";
import ApiFeatures from "../utils/apiFeatures.js";

/**
 * Pluralize a model name simply
 * Example: category -> categories, business -> businesses
 */
const pluralize = (word) => {
  if (word.endsWith("y")) return word.slice(0, -1) + "ies";
  if (word.endsWith("s")) return word;
  return word + "s";
};

const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

    const modelName = Model.modelName.toLowerCase();
    const pluralModelName = pluralize(modelName);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: {
        [pluralModelName]: docs,
      },
    });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404)
      );
    }

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: "success",
      data: {
        [modelName]: doc,
      },
    });
  });

const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    const modelName = Model.modelName.toLowerCase();

    res.status(201).json({
      status: "success",
      data: {
        [modelName]: newDoc,
      },
    });
  });

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404)
      );
    }

    const modelName = Model.modelName.toLowerCase();

    res.status(200).json({
      status: "success",
      data: {
        [modelName]: doc,
      },
    });
  });

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`No ${Model.modelName} found with that ID`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export { getAll, getOne, createOne, updateOne, deleteOne };
