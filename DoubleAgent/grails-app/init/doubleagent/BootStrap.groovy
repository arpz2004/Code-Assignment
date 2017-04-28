package doubleagent

class BootStrap {

    def grailsApplication
    def init = { servletContext ->
        def file = grailsApplication.mainContext.getResource("cc-maps-data-set.csv").file
        file.splitEachLine(',') {fields ->
            def spy = new Spy(
                    name: fields[0].trim(),
                    latitude: fields[1].trim(),
                    longitude: fields[1].trim(),
                    age: fields[1].trim(),
                    gender: fields[1].trim()
            )

            if (spy.hasErrors() || spy.save(flush: true) == null) {
                log.error("Could not import spy  ${spy.errors}")
            }

            log.debug("Importing spy  ${spy.toString()}")
        }
    }
    def destroy = {
    }
}
