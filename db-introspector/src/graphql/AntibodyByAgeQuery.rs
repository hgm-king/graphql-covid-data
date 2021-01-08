use crate::models::AntibodyByAgeModel::AntibodyByAgeT;
use crate::{establish_connection, Context};

use juniper::{FieldResult};

pub struct AntibodyByAgeQuery;

pub trait AntibodyByAgeQuery {
    fn AntibodyByAge(context: &Context) -> FieldResult<Vec<AntibodyByAgeT>> {
        let connection = establish_connection();
        let antibody = AntibodyByAgeModel::read(&connection);
        Ok(antibody)
    }
}
