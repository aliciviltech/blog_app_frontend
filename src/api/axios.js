import apiClient from ".";

const getReq = async (path) => {
    try {
        const response = await apiClient.get(path,{
      withCredentials: true
    });
        return response;
    } catch (error) {
        console.log(error)
        throw new Error(error);

    }
}

const getByIdReq = async (path) => {
    try {
        const response = await apiClient.get(path);
        return response;
    } catch (error) {
        console.log(error)
    }
}

const postReq = async (path, data) => {
    try {
        const response = await apiClient.post(path, data, {
      withCredentials: true
    });
        return response;
    } catch (error) {
        // console.log("Error:", error.response.data.message)
        throw new Error(`${error}`);
    }
}

const deleteReq = async (path) => {
    try {
        const response = await apiClient.delete(path);
        return response;
    } catch (error) {
        console.log(error.message)
        throw new Error(`Error in axios: ${error}`);

    }
}

const putReq = async (path, data) => {
    try {
        const response = await apiClient.put(path, data);
        console.log(response)
        return response
    } catch (error) {
        throw new Error(`Error in axios putReq: ${error.response?.data.message}`);
    }
}

export { getReq, postReq, putReq, deleteReq, getByIdReq }