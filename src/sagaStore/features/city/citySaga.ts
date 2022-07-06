import { fetchCities } from '@sagaStore/service/city.service';
import { ListResponse } from '@shared/interfaces/common';
import { City } from '@shared/models';
import { call, put, takeLatest } from 'redux-saga/effects';


import { cityActions } from './citySlice';

function* fetchCityList()
{
    try
    {
        const response: ListResponse<City> = yield call(fetchCities);
        yield put(cityActions.fetchCityListSuccess(response));
    } catch (error)
    {
        yield put(cityActions.fetchCityListFailed(error.message));
    }
}

export default function* citySaga()
{
    yield takeLatest(cityActions.fetchCityList.type, fetchCityList);
}