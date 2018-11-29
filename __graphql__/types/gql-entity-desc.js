export default class GqlEntityDesc {
  constructor(
    gqlTypeName,
    mutationParams,
    graphParams,
    returnFields,
    variables,
    variablesUpdateValues
  ) {
    this.T = gqlTypeName;
    this.mutationParams = mutationParams;
    this.graphParams = graphParams;
    this.returnFields = returnFields;
    this.variables = variables;
    this.variablesUpdateValues = variablesUpdateValues;
  }
}
