export default {
  async contactCoach(context, data) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      userEmail: data.email,
      message: data.message
    }

    const response = await fetch(`https://vue-http-fc1c5-default-rtdb.firebaseio.com/requests/${data.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })

    const responseData = await response.json()

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to send')
      throw error
    }

    newRequest.id = responseData.name
    newRequest.coachId = data.coachId

    context.commit('addRequest', newRequest)
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId
    console.log(coachId)
    const token = context.rootGetters.token
    console.log(token)
    const response = await fetch(`https://vue-http-fc1c5-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token)

    const responseData = await response.json()
    console.log(responseData)

    if(!response.ok) {
      const error = new Error(responseData.message || 'Failed to send')
      throw error
    }

    const requests = []

    for(const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      }
      requests.push(request)
    }

    context.commit('setRequests', requests)

  }

}