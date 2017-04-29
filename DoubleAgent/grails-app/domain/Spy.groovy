class Spy{
    String name
    float longitude
    float latitude
    int age
    String gender

    // No property can be blank
    static constraints = {
        name blank: false
        // Longitude must be between -180 and 180
        longitude blank: false, min: -180f, max: 180f
        // Latitude must be between -90 and 90
        latitude blank: false, min: -90f, max: 90f
        // Age must be between 0 and 200
        age blank: false, min: 0, max: 200
        gender blank: false
    }
}