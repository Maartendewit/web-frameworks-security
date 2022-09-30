package nl.hva.wfis2024.esserver.repositories;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;

public class CustomJson {
    public static class Shallow {}
    public static class Summary extends Shallow {}
    
    public static class ShallowSerializer extends JsonSerializer<Object> {
        @Override
        public void serialize(Object o, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper().configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false).setSerializationInclusion(JsonInclude.Include.NON_NULL);
            //Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule()).configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
            //Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig().withView(CustomJson.Shallow.class));
            
            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(o);
        }
    }
}
