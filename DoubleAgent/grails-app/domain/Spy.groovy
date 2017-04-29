class Spy{
    String name
    float longitude
    float latitude
    int age
    String gender

    static constraints = {
        name blank: false
        longitude blank: false, min: -180f, max: 180f
        latitude blank: false, min: -90f, max: 90f
        age blank: false, min: 0, max: 200
        gender blank: false
    }
}